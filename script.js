var penPromiseOG = d3.json("classData.json");

var penPromise = d3.json("classData.json");

penPromise.then(
function(data)
    {
        makePenTable(data);
        quizMean(data);
        testMean(data);
        homeworkMean(data);
        calcFinal(data);
        sortQuiz();
        console.log("Data Loaded",data);
    },
function(err)
    {
        console.log("Broke",err);
    })

var makePenTable = function(penguin)
{
    //appends tbody to the thead
    //var tableBody = d3.select("table")
        //.data(penguin)
        //.enter()
        
    d3.select("table").append("th").text("Image")
        .on("click", function(d)
           {alert("hello");})
    d3.select("table").append("th").text("Quiz Mean")
    d3.select("table").append("th").text("Test Mean")
    d3.select("table").append("th").text("Homework Mean")
    d3.select("table").append("th").text("Final Grade")        
    
    //appends rows with data to the tbody
    var row = d3.select("table").selectAll("tr")
        .data(penguin)
        .enter()
        .append("tr")
    
    //appends image to beginning of the row
        row.append("td")
        .append("img")
        .attr("src", function(d)
             {return d.picture})
        
    //quizMean
        row.append("td")
        .append("span")
        .text(function(d)
             {return quizMean(d)})
    
    //testMean
        row.append("td")
        .append("span")
        .text(function(d)
              {return testMean(d)})
    
    //homeworkMean
        row.append("td")
        .append("span")
        .text(function(d)
             {return homeworkMean(d)})
    
    //final grade
        row.append("td")
        .append("span")
        .text(function(d)
              {return calcFinal(d)})
    
}

var quizMean = function(penguin)
{
    return d3.mean(penguin.quizes.map(getGrade))
}

var testMean = function(penguin)
{
    return d3.mean(penguin.test.map(getGrade))
}

var homeworkMean = function(penguin)
{
    return d3.mean(penguin.homework.map(getGrade))
}

var getFinal = function(penguin)
{
    return d3.mean(penguin.final.map(getGrade))
}
var calcFinal = function(penguin)
{
   return quizMean(penguin) * .2
    + testMean(penguin) * .3
    + homeworkMean(penguin) * .15
    + getFinal(penguin) * .35
    
}
var getGrade = function(assignment)
{
    return assignment.grade;
}

var alert = function()
{
    if (calcFinal(d) < 70)
    {
        return d3.select("tr").style("background-color", "red")
    }
    else
    {
        
    }
}

var sortQuiz = function()
{
    penPromise.sort(function(a,b)
    {
        return a.quizes-b.quizes;
    });
}