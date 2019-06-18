function showStar(num){
    let total = '';
    for(let i = 0; i < num; i++)
    {
        total += '<i class="fa fa-star"> </i>';
    }
    return total;
}

function formatDate(date){
    return date.toLocaleString();
    
}

function formatStatus(status){
    if(status === -1){
        return "Đang xử lý";
    }
    if(status === 0){
        return "Đang giao";
    }
    if(status === 1){
        return "Đã giao"
    }
}

function formatCurrency(value){
    return value.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
}

module.exports = {
    showStar,
    formatDate,
    formatStatus,
    formatCurrency
};


