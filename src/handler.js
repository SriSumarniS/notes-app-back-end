const { nanoid } = require('nanoid'); // impor nanoid dari packagenya
const notes = require('./notes'); // impor array notes

const addNoteHandler = (request, h) => {
   const { title, tags, body } = request.payload; // body request di hapi (title, tag, body)

   const id = nanoid(16); // memanggil nanoid dengan parameter ukuran string

   const createdAt = new Date().toISOString(); // properti createdAt
   const updatedAt = createdAt; // properti updatedAt

   const newNote = {
      title, tags, body, id, createdAt, updatedAt,
    }; // memasukan nilai array notes
    notes.push(newNote); // menggunakan metode push
    const isSuccess = notes.filter((note) => note.id === id).length > 0; // menentukan newNote sudah masuk ke dalam array notes sesuai id

    // menambahkan issue message
    if (isSuccess) {
      const response = h.response({
         status: 'success',
         message: 'Catatan berhasil ditambahkan',
         data: {
            noteId: id,
         },
      });
      response.code(201);
      return response;
    }

    const response = h.response({
      status: 'fail',
      message: 'Catatan gagal ditambahkan',
    });
    response.code(500);
    return response;
};
// konfigurasi GET
const getAllNotesHandler = () => ({
   status: 'success',
   data: {
      notes,
   },
});

// menampilkan detail
const getNoteByIdHandler = (request, h) => {
   const {id} = request.params;
   const note = notes.filter((n) => n.id === id)[0];
   if (note !== undefined) {
      return {
         status: 'success',
         data: {
            note,
         },
      };
   }

   const response = h.response({
      status: 'fail',
      message: 'Catatan tidak ditemukan',
   });
   response.code(404);
   return response;
};

// mengubah catatan
const editNoteByIdHandler = (request, h) => {
   const {id} = request.params; // mengubah dengan id
   const {title, tags, body} = request.payload; // mendapat data notes terbaru
   const updatedAt = new Date().toISOString(); // date update
   const index = notes.findIndex((note) => note.id === id);
   if (index !== -1) {
      notes[index] = {
        ...notes[index],
        title,
        tags,
        body,
        updatedAt,
      };
      const response = h.response({
        status: 'success',
        message: 'Catatan berhasil diperbarui',
      });
      response.code(200);
      return response;
    }
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui catatan. Id tidak ditemukan',
    });
    response.code(404);
    return response;
};

// menghapus catatan
const deleteNoteByIdHandler = (request, h) => {
   const { id } = request.params; // mendapatkan data yang dikirim
   const index = notes.findIndex((note) => note.id === id); // dapatkan index sesuai id
   if (index !== -1) {
      notes.splice(index, 1);
      const response = h.response({
        status: 'success',
        message: 'Catatan berhasil dihapus',
      });
      response.code(200);
      return response;
    }
    const response = h.response({
      status: 'fail',
      message: 'Catatan gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);
    return response;
};

module.exports = { 
   addNoteHandler, 
   getAllNotesHandler, 
   getNoteByIdHandler, 
   editNoteByIdHandler, 
   deleteNoteByIdHandler };
