$(function () {
    /**
     * datepicker汉化
     */
    $.fn.datepicker.dates['zh-CN'] = {
        days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
        daysShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        daysMin: ["日", "一", "二", "三", "四", "五", "六", "日"],
        months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
        monthsShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
        today: "今日",
        suffix: [],
        meridiem: []
    };

    // datepicker初始化
    $('#datepicker').datepicker({
        language: 'zh-CN',
        format: 'yyyy-mm-dd',
        keyboardNavigation: false,
        forceParse: false,
        autoclose: true,
        todayHighlight: true
    });

    // 获取总条数
    function getRows() {
        $.getJSON('/mock/rows.json', $('form').serialize(), function (response) {
            loadData(0);
            initPagination(response);
        })
    }

    // 拉取粉丝数据
    function loadData(page) {
        $.getJSON('/mock/list.json', $('form').serialize() + '&page=' + page, function (data) {
            $('#follow-table tbody').empty();
            $('#loading-bar').show();
            // setTimeout 模拟加载时间
            setTimeout(function () {
                $('#loading-bar').hide();
                $('#table-tmpl').tmpl(data).appendTo($('#follow-table tbody'));
            }, 2000);
        });
    }

    // 初始化分页控件
    function initPagination(data) {
        if (data.rows > 10) {
            // setTimeout 模拟加载时间
            setTimeout(function () {
                $("#table-pagination").pagination(data.rows, {
                    current_page: 0,
                    items_per_page: data.per_page,
                    prev_text: "上一页",
                    next_text: "下一页",
                    num_edge_entries: 1,
                    num_display_entries: 10,
                    prev_show_always: true,
                    next_show_always: true,
                    callback: function (page) {
                        loadData(page);
                    }
                });
                $('#table-pagination').show();
            }, 2000);
        } else {
            $('#table-pagination').hide();
        }
    }

    // 查询按钮点击
    $('#search-btn').on('click', getRows).get(0).click();

    // 输入框键盘回车监听
    $('#keyword').on('keyup', function (e) {
        e.keyCode == 13 && $('#search-btn').get(0).click();
    });

});