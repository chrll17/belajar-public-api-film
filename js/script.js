function searchFilm(){
    $.ajax({
        url: 'http://omdbapi.com', // servernya ambil data dari sini
        type: 'get', // method
        dataType: 'json', // kembaliannya mau bentuk apa?
        data: { // data yang akan dikirim ke url
            'apikey' : '732a7841', // API Key untuk autentikasi
            's' : $('#search-input').val() // Kata kunci pencarian dari input
        },
        success: function (result){ // Callback jika request sukses
            console.log(result) // testing hasil di console browser (debugging)
        }
    })
}

$('#search-button').on('click',function(){
    searchFilm(); // Panggil fungsi searchFilm
})