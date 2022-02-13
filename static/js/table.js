// this is to make numbers sort as numbers rather than strings!!!
// try on id column
function convertToNumericIfNumber(str) {
    if (!isNaN(str) && !isNaN(parseFloat(str))) {
        return parseFloat(str) 
    } 
    return str
}

d3.csv('/static/data/Kaggle_TwitterUSAirlineSentiment.csv', function(error, data){
    if (error) {
        throw error
    }

    var sortAscending = true;
    var table = d3.select('#page-wrap').append('table');
    var titles = d3.keys(data[0]);
    var headers = table.append('thead').append('tr').selectAll('th').data(titles)
        .enter().append('th')
        .text(function(d) {
            return d;
        }).on('click', function(d){
            headers.attr('class', 'header');
            if (sortAscending) {
                rows.sort((a, b) => convertToNumericIfNumber(b[d] )< convertToNumericIfNumber(a[d]) ? 1 : -1)
                sortAscending = false
                this.className = 'aes'
            } else {
                rows.sort((a,b) => convertToNumericIfNumber(b[d]) > convertToNumericIfNumber(a[d]) ? 1 : -1)
                sortAscending = true
                this.className = 'des'
            }
        });

    
    var rows = table.append('tbody').selectAll('tr').data(data).enter().append('tr');

    rows.selectAll('td').data(function(d){
        return titles.map(function (k) {
            return {'value': d[k], 'name' : k};
        });
    }).enter().append('td').attr('data-th', function(d){
        return d.name
    }).text(function (d){
        return d.value
    });

});