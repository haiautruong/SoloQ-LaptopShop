function showStar(num){
    let total = '';
    for(let i = 0; i < num; i++)
    {
        total += '<i class="fa fa-star"> </i>';
    }
    return total;
}

module.exports.showStar = showStar;