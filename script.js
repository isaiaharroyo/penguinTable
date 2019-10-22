var penPromise = d3.json("classData.json");

penPromise.then(
function(data)
    {
        makePenTable(data);
        quizMean(data);
        console.log("Data Loaded",data);
    },
function(err)
    {
        console.log("Broke",err);
    })


var makePenTable = function(penguin)
{
    var table = d3.select("table").select("#tbody").selectAll("tr")
        .data(penguin)
        .enter()
        .append("tr")
        .append("td")
    
        table.append("img")
        .attr("src", function(d)
             {return d.picture})
    
        table.append("span")
        .text(function(d)
             {return quizMean(d)})
}

var quizMean = function(penguin)
{
    return d3.mean(penguin.quizes.map(getGrade))
}

var getGrade = function(assignment)
{
    return assignment.grade;
}