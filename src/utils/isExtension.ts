export const getFileExtension = (file: string) => file?.split('.').pop()

export const isJson = (file: string) => file?.split('.').pop() === 'json'

export const isGlb = (file: string) => file?.split('.').pop() === 'glb'

export const isGltf = (file: string) => file?.split('.').pop() === 'gltf'

export const isZip = (file: string) => file?.split('.').pop() === 'zip'
