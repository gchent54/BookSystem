#接口设计说明：
##1.getAllData：获取所有的数据，包括一共有几条数据，传递的参数：无    -------GET
##2.getBookDataById:获取图书的数据通过id，传递的参数：id    ------GET
##3.insertBookData：添加图书的功能，用户传递的数据：bookName，bookAuthor，bookGender   --POST
##4.deleteStateById：软删除数据，将isDel的状态值修改为1，传递的数据：id    -----GET
##5.deleteDataById：实际删除数据，通过id  传递的参数：id   -----GET
##6.updateDataById:修改功能，传递的参数：bookName，bookAuthor，bookGender,id   ----POST
##7.rocoverStateById:软删除恢复的功能，将isDel的值从1修改为0，    -----GET
##8.sortSmallToBig：从小到大排序    -----GET
##9.sortBigToSmall：从大到小排序   -----GET
##10.searchPage：根据当前是第几页的情况，获取这一页的数据展示，传入的参数：nowPage    -----GET
##11.searchData：搜索当前所有图书名称数据里面的某一条的内容  传入的参数：bookName    ----GET
##12.注意：默认数据的展示要求按照时间最近的展示排序