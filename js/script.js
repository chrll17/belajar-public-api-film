function searchFilm(){
    $('#film-list').html('') // agar search nya tidak double
    $.ajax({
        url: 'http://omdbapi.com', // servernya ambil data dari sini
        type: 'get', // method
        dataType: 'json', // kembaliannya mau bentuk apa?
        data: { // data yang akan dikirim ke url
            'apikey' : '732a7841', // API Key untuk autentikasi
            's' : $('#search-input').val() // Kata kunci pencarian dari input
        },
        success: function (result){ // Callback jika request sukses
            if (result.Response == "True") {
                let films = result.Search
                $.each(films, function(i,data){
                    $('#film-list').append(`
                        <div class="col">
                            
                            <div class="card" style="width: 15rem;">
                                <img src="`+ data.Poster +`" class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title">`+ data.Title +`</h5>
                                    <h6 class="card-subtitle mb-2 text-muted">`+ data.Year +`</h6>
                                    <a href="#" class="card-link detail" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="`+ data.imdbID +`">detail</a>
                                </div>
                            </div>

                        </div>
                    `)
                })

                $('#search-input').val('') // untuk menghilangkan keyword yang telah dicari

            }else{
                $('#film-list').html(`
                    <div class="col">
                        <h1 class="text-center">` + result.Error + `</h1>
                    </div>    
                `)
            }
        }
    })
}

$('#search-button').on('click',function(){
    searchFilm(); // Panggil fungsi searchFilm
})

// agar bisa klik search dengan tombol enter
$('#search-input').on('keyup', function(e) {
    if(e.keyCode === 13){
        searchFilm()
    }
})

// menangkap data ketika klik detail
$('#film-list').on('click', '.detail', function() { // carikan elemen film-list yang ketika di klik elemen yang kelasnya 'detail' di dalamnya, jalankan fungsi ini
    $.ajax({
        url: 'http://omdbapi.com', // servernya ambil data dari sini
        type: 'get', // method
        dataType: 'json', // kembaliannya mau bentuk apa?
        data: { // data yang akan dikirim ke url
            'apikey' : '732a7841', // API Key untuk autentikasi
            'i' : $(this).data('id') 
        },
        success: function (film){
          if (film.Response == "True") {
                $('.modal-body').html(`
                     <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-4">
                                <img src="`+ film.Poster +`" class="img-fluid">
                            </div>

                            <div class="col-md-8">
                                <ul class="list-group">
                                    <li class="list-group-item"><h3>`+ film.Title +`</h3></li>
                                    <li class="list-group-item">Released : `+ film.Released +`</li>
                                    <li class="list-group-item">Genre : `+ film.Genre +`</li>
                                    <li class="list-group-item">Director : `+ film.Director +`</li>
                                    <li class="list-group-item">Actors : `+ film.Actors +`</li>
                                    </ul>
                            </div>
                        </div>
                     </div
                `)
            }else{
                $('#film-list').html(`
                    <div class="col">
                        <h1 class="text-center">` + result.Error + `</h1>
                    </div>    
                `)
            }  
        }
    })
})