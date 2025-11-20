export const environment = {
  production: false,
  title: 'Local Environment Heading',
  apiUrl : 'http://localhost:8990',
  endpoints: {
    auth:{
      login : '/login',
      logout: '/logout',
      refresh: '/auth/refresh',
      register: '/auth/register'

    },
    paciente : '/patient',
    doctor : '/doctor',
    diagnostico: '/diagnostico',
    image:{
      base: '/image',
      viewImage : '/image/find',
      upload: '/image/upload',
      download: '/image/download',
      macro: '/macro',
      micro: '/micro',
    },
    file : {
      historiaClinica: '/file',
      upload: '/file/upload',
      download: '/file/download',
      view: '/file/find',
      delete: '/file/delete'
    },
  },
  config: {
    tokenExpirationTime: 3600, // in seconds
    refreshTokenExpirationTime: 86400, // in seconds
    maxFileSize: 5242880, // 5 MB in bytes
    allowedFileTypes: ['application/pdf', 'image/jpeg', 'image/png', 'image/gif', 'image/jpg'],
    pageSize: 10
  },
  features: {
    enableLogging: true,
    enableAnalytics: false
  }
}
