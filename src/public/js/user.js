$.ajax({
    url: 'http://localhost:3000/users',
    type: 'GET',
    success: function (data) {
        $('#user-list').DataTable({
            data: data,
            columns: [
                { data: 'name' },
                { data: 'email' },
                { data: 'dob' },
                { data: 'gender' },
                { data: 'mobile' }
            ]
        });
    }
});

const userInputForm = document.querySelector('#add-user');

userInputForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let name = $('#name').val();
    let email = $('#email').val();
    let dob = $('#dob').val();
    let gender = $('input[name=gender]').val();
    let mobile = $('#mobile').val();
    let userData = { name, email, dob, gender, mobile };
    console.log(userData);

    $.ajax({
        type: 'POST',
        url: `http://localhost:3000/users`,
        data: userData,
        success: (data) => {
            console.log(data);
        },
        error: (error) => {
            console.log(error);
        }
    });

    userInputForm.reset();
    $('#user-list').DataTable().destroy();
});