(function () {
 angular
.module('readApp')
.controller('aboutCtrl', aboutCtrl);
    function aboutCtrl() {
        var vm = this;
        vm.title = '<b>ReadingClub</b>';
        vm.user = {
            userName: "stoneniqiu",
        };
        vm.list = [
            "第一期   《失控》             -- 上海-stoneniqiu",
            "第二期   《代码整洁之道》     -- 上海-stoneniqiu",
            "第三期   《女人的起源》       -- 长沙-素情",
            "第四期   《数学之美》         -- 广州_Watery.D.Lotus",
            "第五期   《卓有成效的管理者》 -- 北京-卡萨布兰卡",
            "第六期   《异类》             -- 上海-stoneniqiu",
            "第七期   《设计心理学》       -- 北京--彦圣",
            "第八期   《乌合之众》         -- 广州_Watery.D.Lotus & 上海_stoneniqiu",
            "第九期   《国富论》           -- 上海-stoneniqiu",
            "第十期   《少有人走的路》     -- 深圳-一路风景",
            "第十一期 《程序员修炼之道》   -- stoneniqiu",
            "第十二期 《性格色彩》         -- 上海_星空"
        ];
    }
})();
