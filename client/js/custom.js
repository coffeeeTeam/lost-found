function ready () {
  $.ajax({
    type: 'GET',
    url: 'http://localhost:3000/list',
    success: function (data) {
      //   console.log(data)
      // console.log(JSON.parse(data))
      let booklist = data

      for (var i = 0; i < booklist.length; i++) {
        let item = booklist[i]
        let table = `<div class="box-item">
            <h2>Item Found</h2>
            <div class="row">
              <div class="col-3">
                <img src="http://localhost:3000/images/${item.photobarang}" alt="">
              </div>
              <div class="col-9">
                <form>
                  <h3>Description : </h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                  <h4 class="notfound" >Not Found</h4>
                </form>
              </div>
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
