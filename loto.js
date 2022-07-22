var lotoString = ""
var lotoArr = [];
$( "#phieuLoto" ).keyup(function() {
    try {
        // let num = $(this).val().substring($(this).val().lastIndexOf("-") + 1, $(this).val().lastIndexOf("-") + 3);
        // if (num.length == 2) {
        //     lotoArr.push(num)
        // }
        lotoArr = $(this).val().split(" ");
    } catch (e) {

    }
});

$("#add").on("click", function () {
    if (lotoArr.length == 25) {
        var html = `
            <table class="table table table-bordered text-center">
                <body>
        `
        let count = 0;
        lotoArr.forEach(value => {
            count++;
            if (count == 1) {
                html += `<tr>`
            }
            html += `<td>${value}</td>`;
            if (count == 5) {
                html += `</tr>`;
                count = 0;
            }
        })
        html += `</body></table>`;
        
        $("#multi-table").append(html);
        
    } else {
        alert("Chua du 25 so")
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
}
