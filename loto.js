var lotoString = ""
var lotoArr = [];
var listLotoArr = [];
var numbers = [];

$(document).ready(function name() {
    let str = localStorage.getItem("listLotoArr");
    if (str) {
        let strArr = str.split(",");
        let cnt = 1;
        strArr.forEach(ele => {
            lotoArr.push(ele);
            cnt++;
            if (cnt == 26) {
                createPhieuLoTo();
                listLotoArr.push(lotoArr)
                lotoArr = [];
                cnt = 1;
            }
        });
    }
})

function loadLichSuPhieu() {
    let html = ``;
    listLotoArr.forEach((v, index) => {
        let value = v.join(" ");
        html += `
            <div data-id="${index}" class="mb-3">
                <span><strong>Phiếu ${index + 1}: </strong>${value}</span>
                <button class="btn btn-outline-success btn-add-lichsu">Thêm</button>
                <button class="btn btn-outline-danger btn-remove-lichsu">Xóa</button>
            </div>
        `
    })
    $(".modal-body").html(html);
}

$(".modal-body").on("click", ".btn-remove-lichsu", function () {
    listLotoArr.splice($(this).parent().attr("data-id"), 1);
    loadLichSuPhieu();
    localStorage.setItem("listLotoArr", listLotoArr);
});

$(".modal-body").on("click", ".btn-add-lichsu", function () {
    console.log($(this).parent().attr("data-id"));
    lotoArr = listLotoArr[$(this).parent().attr("data-id")];
    createPhieuLoTo();
});

function createPhieuLoTo() {
    if (lotoArr.length == 25) {
        var html = `
            <div class="bg-white mb-4">
                <span class="btn btn-remove bg-danger text-white rounded-circle p-1">X</span>
                <input contenteditable="true" class="name font-weight-bold" value="name"/>
                <table class="table table table-bordered text-center m-0">
                    <tbody>
        `
        let count = 0;
        lotoArr.forEach(value => {
            count++;
            if (count == 1) {
                html += `<tr>`
            }
            html += `<td contenteditable="true">${value}</td>`;
            if (count == 5) {
                html += `</tr>`;
                count = 0;
            }
        })
        html += `</tbody></table></div>`;
        
        $("#multi-table").append(html);
        $("#phieuLoto").val("");
        return true;
    } else {
        alert("Chua du 25 so")
    }
}

$("#add").on("click", function () {
    lotoArr = $("#phieuLoto").val().split(" ");
    if (createPhieuLoTo()) {
        listLotoArr.push(lotoArr);
        localStorage.setItem("listLotoArr", listLotoArr);
    }
})

$("#enter").on("click", function () {
    let value = $("#soLoto").val();
    $("#multi-table table td").each(function () {
        if($(this).text() == value) {
            $(this).addClass("bg-success")
        }
    });
    bingo();
    numbers.push($("#soLoto").val());
    $(".numbers").html(numbers.join(" "))
    $("#soLoto").val("");
}) 

$("#remove").on("click", function () {
    let value = $("#removeSoLoto").val();
    $("#multi-table table td").each(function () {
        if($(this).text() == value) {
            $(this).removeClass("bg-success")
        }
    });
    $("#removeSoLoto").val("");
}) 

function bingo() {
    $("tbody").each(function () {
        let cnt = 0;
        for (let j = 0; j < 5; j++) {
            cnt = 0;
            // chieu ngang 
            for (let i = 0; i < 5; i++) {
                if ($($($(this).children()[j]).children()[i]).hasClass("bg-success")){
                    cnt++;
                }
            }
            if (cnt == 5) {
                break;
            } else {
                cnt = 0;
            }
            // chieu doc
            for (let i = 0; i < 5; i++) {
                if ($($($(this).children()[i]).children()[j]).hasClass("bg-success")){
                    cnt++;
                }
            }
            if (cnt == 5) {
                break;
            } else {
                cnt = 0;
            }
            // 2 cot cheo
            for (let i = 0; i < 5; i++) {
                if (j == 0) {
                    if ($($($(this).children()[i]).children()[i]).hasClass("bg-success")){
                        cnt++;
                    }
                } else if (j == 4) {
                    if ($($($(this).children()[4-i]).children()[i]).hasClass("bg-success")){
                        cnt++;
                    }
                }
            }
            if (cnt == 5) {
                break;
            } else {
                cnt = 0;
            }
        }
        if (cnt == 5 && !$(this).hasClass("bingo")) {
            $(".btn-bingo").click();
            $(this).addClass("bingo");
        }
    })
}


$("#multi-table ").on("input", function() {
    $(event.target).removeClass("bg-success");
});

$("#multi-table ").on("click", ".btn-remove", function() {
    if (confirm("Bạn chắc chắn muốn xóa phiếu loto này?")) {
        $(this).parent().remove()
    }
});
