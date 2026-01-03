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
                                    <a href="#" class="card-link">detail</a>
                                </div>
                            </div>

                        </div>
                    `)
                })
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