const addCards = (items) => {
    console.log(items);
    items.forEach(item => {
        let itemToAppend = '<div class="col s4 center-align"> <div class="card medium"><div class="card-image waves-effect waves-block waves-light"><img class="activator" src="'+ item.image +'"></img></div><div class="card-content"><span class="card-title activator grey-text text-darken-4">'+ item.title +'<i class="material-icons right">more_vert</i></span><p><a href="#">'+item.link+'</a></p></div><div class="card-reveal"><span class="card-title grey-text text-darken-4">'+item.title+'<i class="material-icons right">close</i></span><p class="card-text">'+item.description+'</p></div></div></div>';
        $('#card-section').append(itemToAppend);
    });
}

const submitForm = () => {
    let formData = {};
    formData.title = $('#title').val();
    formData.image = $('#image').val();
    formData.link = $('#link').val();
    formData.description = $('#desciption').val();

    console.log('form data: ', formData);
    addBeach(formData);
}

const deleteForm = () => {
    let formData = {};
    formData.title = $('#titleDelete').val();
    
    console.log('form data: ', formData);
    deleteBeach(formData);
}

const getBeaches = () => {
    $.get('/api/beaches', (res) => {
        if (res.statusCode === 200) {
            addCards(res.data);
        }
    });
}

const addBeach = (beach) => {
    $.ajax({
        url: 'api/beaches',
        data: beach,
        type: 'POST',
        success: (result) => {
            alert(result.message);
            location.reload();
        }
    });
}

const deleteBeach = (beach) => {
    $.ajax({
        url: 'api/beaches',
        data: beach,
        type: 'DELETE',
        success: (result) => {
            alert(result.message);
            location.reload();
        }
    });
}

$(document).ready(function(){
    $('.materialboxed').materialbox();
    $('.modal').modal();

    getBeaches();

    $('#formSubmit').click(()=>{
        submitForm();
    })

    $('#formDeleteSubmit').click(()=>{
        deleteForm();
    })
});