var penPromise = d3.json("classData.json");

penPromise.then(
function(data)
    {
        makePenTable(data);
        quizMean(data);
        testMean(data);
        homeworkMean(data);
        calcFinal(data);
        idFunct();
        quizArray(data);
        console.log("Data Loaded",data);
    },
    
    
    
function(err)
    {
        console.log("Broke",err);
    })

var makePenTable = function(penguin)
{        
    d3.select("table").append("th").text("Image")
    d3.select("table").append("th").text("Quiz Mean")
        .on("click", function(d)
           {alert("You clicked Quiz Mean!"); });
    d3.select("table").append("th").text("Test Mean")
        .on("click", function(d)
           {alert("You clicked Test Mean!"); });
    d3.select("table").append("th").text("Homework Mean")
        .on("click", function(d)
           {alert("You clicked Homework Mean!"); });
    d3.select("table").append("th").text("Final Grade")
        .on("click", function(d)
           {alert("You clicked Final Grade!"); });
    
    //appends rows with data to the tbody
    var row = d3.select("table").selectAll("tr")
        .data(penguin)
        .enter()
        .append("tr")
    
    //appends image to beginning of the row
        row.append("td")
        .attr("id",function(d)
              {
                if (calcFinal(d) >= 70)
                {
                  return "pass";
                }
                else
                {
                   return "fail";
                }
              })
        .append("img")
        .attr("src", function(d)
             {return d.picture})
        
    //quizMean
        row.append("td")
        .append("span")
        .text(function(d)
             {return quizMean(d).toFixed(2)})
    
    //testMean
        row.append("td")
        .append("span")
        .text(function(d)
              {return testMean(d).toFixed(2)})
    
    //homeworkMean
        row.append("td")
        .append("span")
        .text(function(d)
             {return homeworkMean(d).toFixed(2)})
 
    //final grade
        row.append("td")
        .attr("id",function(d)
              {
                if (calcFinal(d) >= 70)
                {
                  return "pass";
                }
                else
                {
                   return "fail";
                }
              })
        .append("span")
        .text(function(d)
              {return calcFinal(d).toFixed(2)})

}

var quizMean = function(penguin)
{
    return d3.mean(penguin.quizes.map(getGrade));
}

var testMean = function(penguin)
{
    return d3.mean(penguin.test.map(getGrade));
}

var homeworkMean = function(penguin)
{
    return d3.mean(penguin.homework.map(getGrade));
}

var getFinal = function(penguin)
{
    return d3.mean(penguin.final.map(getGrade));
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

var idFunct = function()
{
    d3.select("td").attr("id","color");
}

var quizArray = function(penguin)
{
    var sorted = penguin.quizes.map(getGrade).sort(function(a,b)
    {
        return b.quizes - a.quizes;
    })
    return sorted;                                  
}
