 $.ajax({
        url: '/api/about',
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            if (response.success && response.data.length > 0) {
                const aboutData = response.data[0];
                $('.about__title').text(aboutData.title);
                $('.about__intro').text(aboutData.subtitle);
                $('.about__description').text(aboutData.text);
                $('.about__main-image').attr('src', aboutData.image);
            }
        },
        error: function() {
            console.error('Error loading About Us data');
        }
    });