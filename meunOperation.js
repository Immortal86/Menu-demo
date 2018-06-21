$(document).ready(function () {
    let sub = $('#sub');
    let activeRow, activeMenu;
    let timer;

    let mouseInSub = false;

    sub.on('mouseenter', function (e) {
        mouseInSub = true;
    }).on('mouseleave', function (e) {
        mouseInSub = false;
    });

    let mouseTrack = [];
    let moveHandler = function (e) {
        mouseTrack.push({
            x: e.pageX,
            y: e.pageY
        });

        if (mouseTrack.length > 3) {
            mouseTrack.shift();
        }
    }

    $('#test')
        .on('mouseenter', function (e) {


            $(document).bind('mousemove', moveHandler)
        })
        .on('mouseleave', function (e) {
            sub.addClass('none');

            if (activeRow) {
                activeRow.removeClass('active');
                activeRow = null;
            }

            if (activeMenu) {
                activeMenu.addClass('none');
                activeMenu = null;
            }

            $(document).unbind('mousemove', moveHandler);
        })
        .on('mouseenter', 'li span', function (e) {//过滤span的mouseenter
            return false;
        })
        .on('mouseenter', 'li', function (e) {
            sub.removeClass('none');
            if (!activeRow) {
                activeRow = $(e.target).addClass('active');
                activeMenu = $('#' + activeRow.data('id'));
                activeMenu.removeClass('none');
                return;
            }

            if (timer) {
                clearTimeout(timer);
            }

            let currentMousePos = mouseTrack[mouseTrack.length - 1];
            let leftCorner = mouseTrack[mouseTrack.length - 2];
            let delay = needDelay(sub, leftCorner, currentMousePos);

            if (delay) {
                timer = setTimeout(function () {
                    if (mouseInSub) {
                        return;
                    }

                    if (!activeRow) return;//直接划出二级菜单

                    activeRow.removeClass('active');
                    activeMenu.addClass('none');

                    activeRow = $(e.target);
                    activeRow.addClass('active');
                    activeMenu = $('#' + activeRow.data('id'));
                    activeMenu.removeClass('none');
                    timer = null;
                }, 300);
            } else {
                let preActiveRow = activeRow;
                let preActiveMenu = activeMenu;

                activeRow = $(e.target);
                activeMenu = $('#' + activeRow.data('id'));

                preActiveRow.removeClass('active');
                preActiveMenu.addClass('none');

                activeRow.addClass('active');
                activeMenu.removeClass('none');

            }
        })
})