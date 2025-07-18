 $.ajax({
        url: '/api/team',
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            if (response.success && response.data.length > 0) {
                const teamData = response.data[0];
                $('.team__title').text(teamData.title);
                $('.team__intro').text(teamData.subtitle);
                $('.team__description').text(teamData.text);
                $('.team__main-image').attr('src', teamData.image);
            }
        },
        error: function() {
            console.error('Error loading Team data');
        }
    });
