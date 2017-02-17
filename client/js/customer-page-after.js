function ready () {
  $.ajax({
    type: 'GET',
    url: 'http://localhost:3000/list',
    success: function (data) {
      let booklist = data

      for (var i = 0; i < booklist.length; i++) {
        let item = booklist[i]
        let table = `
        <div class="ui grid row stacked segment">
          <div class="six wide column">
            <img src="http://localhost:3000/images/${item.photobarang}" alt="">
          </div>
           <div class="ten wide column">
            <p class="ui header" style="color:#0073e6;">${item.namabarang}</p>
            <p><b>Deskripsi</b></p>
            <p>${item.description}</p>

           </div>
         </div>`
        $('#mainwrapper').append(table)
      }
    },
    error: function (err) {
      console.log(err)
    }
  })
}

$(document).ready(function () {
  ready()
})
