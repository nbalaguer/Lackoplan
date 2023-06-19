/*
 * I don't feel like dealing with typescript and missing properties of experimental APIs on the window object,
 * so all related functionality is defined here and interacted from ts files.
 */

export const isFileSystemSupported = !!window?.showOpenFilePicker

/**
 * @return {Promise<FileSystemFileHandle>}
 */
export async function requestLoadFile() {
  /** @type {FileSystemFileHandle[]} */
  const [fileHandle] = await window.showOpenFilePicker()
  return fileHandle
}

/**
 * @param {FileSystemFileHandle} fileHandle
 * @param {string} data
 */
export async function requestSaveFile(fileHandle, data) {
  const fileWriter = await fileHandle.createWritable()
  await fileWriter.write(data)
  fileWriter.close()
}

/**
 * @param {string} data
 */
export async function requestSaveFileAs(data) {
  /** @type {FileSystemFileHandle} */
  const fileHandle = await window.showSaveFilePicker()

  /** @type {FileSystemWritableFileStream} */
  const fileWriter = await fileHandle.createWritable()
  await fileWriter.write(data)
  await fileWriter.close()

  return fileHandle
}
