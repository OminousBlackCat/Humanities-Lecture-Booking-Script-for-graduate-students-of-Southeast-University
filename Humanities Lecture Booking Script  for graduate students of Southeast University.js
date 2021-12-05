// @name         seu研究生人文讲座傻瓜式预约脚本 Humanities Lecture Booking Script for graduate students of Southeast University
// @namespace    http://nic.seu.edu.cn/
// @version      v1.02
// @description  东南大学 我真的好喜欢你啊 为了你 我要写脚本
// @author       OminousBlackCat
// @match        *://ehall.seu.edu.cn/gsapp/sys/jzxxtjapp/*
// @icon         http://pic.5tu.cn/uploads/allimg/1510/081431395820.jpg
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @grant        unsafeWindow
// @grant        GM_setValue
// @grant        GM_getValue
// @run-at       document-end
// ==/UserScript==
setTimeout(function(){
    let all_ele = document.getElementsByClassName("bh-border bh-bColor-grey-3 bh-mv-16 hdhb")
    let all_wid = $("[data-x-wid]").map(function(){return $(this).attr("data-x-wid");}).get()
    console.log(all_wid)
    let newVcode = document.createElement("img")
    newVcode.id = "tempImage"
    let newInput = document.createElement("input")
    newInput.id = "tempInput"
    newInput.style = "width:80px;"
    let flash = document.createElement("button")
    flash.textContent = "-1"
    flash.addEventListener("click",function(){
        let temp_data = BH_UTILS.doSyncAjax(baseUrl+'/hdyy/vcode.do' + '?_=' + new Date().getTime(), {})
        $("#tempImage").attr('src', temp_data.result)
    })
    $("h2").append(newVcode)
    $("h2").append(newInput)
    $("h2").append(flash)
    newVcode.addEventListener("click", function(){
        let temp_data = BH_UTILS.doSyncAjax(baseUrl+'/hdyy/vcode.do' + '?_=' + new Date().getTime(), {})
        $("#tempImage").attr('src', temp_data.result)
    })
    for(let i = 0;i<all_ele.length;i++){
        let newbtn = document.createElement("button")
        newbtn.type = "button"
        newbtn.addEventListener("click", function(){
            let code = $("#tempInput").val()
            let foo = {HD_WID: all_wid[i], vcode: code}
            BH_UTILS.doAjax(baseUrl+'/hdyy/yySave.do', {paramJson : JSON.stringify(foo)}).done(function(data){
                console.log(data.msg)
            })
        })
        newbtn.textContent = (i + 1).toString()
        $("h2").append(newbtn)
    }
}, 1200);

