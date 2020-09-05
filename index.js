const searchURL = "https://api.github.com/users/USERNAME/repos"
const accessToken = "7e66d2eec7fdf4a69c5688c7e91916680c2855da"

function displayResults(response) {
    $('#results-list').empty();
    console.log(response);
    for (i = 0; i < response.length; i++ ){
        $("#results-list").append(
            `<li>${response[i].name}: <a href="${response[i].html_url}">View Now</a></li>`
        )
    }
    $('#results').removeClass('hidden');
}


function getRepoList(handle){

    const url = "https://api.github.com/users/" + handle + "/repos";

    const options = new Headers({
          "authorization": accessToken});


    fetch(url, options)
        .then(response => {
            if(response.ok) {
                return response.json();
            }
            throw err = Error(response.statusText);
        })
        .then(responseJson => {
            displayResults(responseJson)})
        .catch(err => {
            $('#js-error-message').text('There was an error: ' + err.message);
        });
}



function watchForm(){
    $('#js-form').submit(function(event){
        event.preventDefault();
        const handle = $('#js-handle').val();
        getRepoList(handle);
        event.target.reset();
    })
}

$(watchForm);