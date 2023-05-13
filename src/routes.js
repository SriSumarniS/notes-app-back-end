const { 
   addNoteHandler, 
   getAllNotesHandler, 
   getNoteByIdHandler, 
   editNoteByIdHandler, 
   deleteNoteByIdHandler } = require('./handler'); // import handler

const routes = [
   {
     method: 'POST',
     path: '/notes',
     handler: addNoteHandler,
   },

   // konfigurasi GET
   {
      method: 'GET',
      path: '/notes',
      handler: getAllNotesHandler, // gunakan fungsi handler
   },
   // detail catatan
   {
      method:'GET',
      path: '/notes/{id}',
      handler: getNoteByIdHandler, // gunakan fungsi tampilkan detail
   },
   // mengubah catatan
   {
      method: 'PUT',
      path: '/notes/{id}',
      handler: editNoteByIdHandler, // gunakan fungsi mengubah catatan
   },
   // menghapus catatan
   {
      method: 'DELETE',
      path: '/notes/{id}',
      handler: deleteNoteByIdHandler, // gunakan fungsi menghapus catatan
    },
 ];
  
 module.exports = routes;