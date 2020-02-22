let button = document.createElement('button');
button.innerHTML = 'hello'
button.addEventListener('click', function() {
    console.log('click')
    // es6草案  webpack tigong
    import('./source.js').then(data => {
        console.log(data)
    })
})
document.body.appendChild(button)