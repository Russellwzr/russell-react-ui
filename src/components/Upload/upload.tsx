import React, { FC, useRef, ChangeEvent, useState } from 'react'
import axios from 'axios'
import UploadList from './uploadList'
import Dragger from './dragger'

export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error'
export interface UploadFile {
  uid: string
  size: number
  name: string
  status?: UploadFileStatus
  percent: number
  raw?: File
  response?: any
  error?: any
}
export interface UploadProps {
  /** URL for file upload */
  action: string
  /** Default list of files to upload */
  defaultFileList?: UploadFile[]
  /** Check and process before uploading the file, if it returns false, stop uploading */
  beforeUpload?: (file: File) => boolean | Promise<File>
  /** Hook function for file uploading */
  onProgress?: (percentage: number, file: UploadFile) => void
  /** Hook function called when file upload succeeds */
  onSuccess?: (data: any, file: UploadFile) => void
  /** Hook function called when file upload fails */
  onError?: (err: any, file: UploadFile) => void
  /** Hook function when the file status changes, it will be called when the upload succeeds or fails	 */
  onChange?: (file: UploadFile) => void
  /** Hook function when removing files from file list */
  onRemove?: (file: UploadFile) => void
  /** Set the request header */
  headers?: { [key: string]: any }
  /** The field name of the uploaded file */
  fileFieldName?: string
  /** Additional parameters to upload with */
  extraParameters?: { [key: string]: any }
  /** Support Cookie or not */
  withCredentials?: boolean
  /** Specify which file types are accepted */
  accept?: string
  /** Support upload multiple files or not */
  multiple?: boolean
  /** Support drag or not */
  drag?: boolean
  children?: React.ReactNode
}

/**
 * Upload files by clicking or dragging
 */
export const Upload: FC<UploadProps> = (props) => {
  const {
    action,
    defaultFileList,
    beforeUpload,
    onProgress,
    onSuccess,
    onError,
    onChange,
    onRemove,
    headers,
    fileFieldName,
    extraParameters,
    withCredentials,
    accept,
    multiple,
    drag,
    children,
  } = props

  const fileInput = useRef<HTMLInputElement>(null)
  const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || [])

  const updateFileList = (updateFile: UploadFile, updateObj: Partial<UploadFile>) => {
    setFileList((prevList) => {
      return prevList.map((file) => {
        if (file.uid === updateFile.uid) {
          return { ...file, ...updateObj }
        } else {
          return file
        }
      })
    })
  }

  const handleClick = () => {
    if (fileInput.current) {
      fileInput.current.click()
    }
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) {
      return
    }
    uploadFiles(files)
    if (fileInput.current) {
      fileInput.current.value = ''
    }
  }

  const handleRemove = (file: UploadFile) => {
    setFileList((prevList) => {
      return prevList.filter((item) => item.uid !== file.uid)
    })
    if (onRemove) {
      onRemove(file)
    }
  }

  const uploadFiles = (files: FileList) => {
    const postFiles = Array.from(files)
    postFiles.forEach((file) => {
      if (!beforeUpload) {
        post(file)
      } else {
        const result = beforeUpload(file)
        if (result instanceof Promise) {
          result.then((processedFile) => {
            post(processedFile)
          })
        } else if (result) {
          post(file)
        }
      }
    })
  }

  const post = (file: File) => {
    const _file: UploadFile = {
      uid: Date.now() + 'upload-file',
      status: 'ready',
      name: file.name,
      size: file.size,
      percent: 0,
      raw: file,
    }
    setFileList((prevList) => {
      return [_file, ...prevList]
    })
    const formData = new FormData()
    formData.append(fileFieldName || 'file', file)
    if (extraParameters) {
      Object.keys(extraParameters).forEach((key) => {
        formData.append(key, extraParameters[key])
      })
    }
    axios
      .post(action, formData, {
        headers: {
          ...headers,
          'Content-Type': 'multipart/form-data',
        },
        withCredentials,
        onUploadProgress: (e) => {
          let percentage = Math.round((e.loaded * 100) / (e.total as number)) || 0
          if (percentage < 100) {
            updateFileList(_file, { percent: percentage, status: 'uploading' })
            _file.status = 'uploading'
            _file.percent = percentage
            if (onProgress) {
              onProgress(percentage, _file)
            }
          }
        },
      })
      .then((resp) => {
        updateFileList(_file, { status: 'success', response: resp.data })
        _file.status = 'success'
        _file.response = resp.data
        if (onSuccess) {
          onSuccess(resp.data, _file)
        }
        if (onChange) {
          onChange(_file)
        }
      })
      .catch((err) => {
        updateFileList(_file, { status: 'error', error: err })
        _file.status = 'error'
        _file.error = err
        if (onError) {
          onError(err, _file)
        }
        if (onChange) {
          onChange(_file)
        }
      })
  }

  return (
    <div>
      <div style={{ display: 'inline-block' }} onClick={handleClick}>
        {drag ? (
          <Dragger
            onFile={(files) => {
              uploadFiles(files)
            }}
          >
            {children}
          </Dragger>
        ) : (
          children
        )}
        <input
          data-testid="file-input"
          style={{ display: 'none' }}
          ref={fileInput}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileChange}
        />
      </div>
      <UploadList fileList={fileList} onRemove={handleRemove} />
    </div>
  )
}

Upload.defaultProps = {
  fileFieldName: 'file',
}

export default Upload
