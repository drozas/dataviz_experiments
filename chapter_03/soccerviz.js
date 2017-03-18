//Loads data and runs the overall viz with the loaded data
function createSoccerViz() {

	d3.csv("worldcup.csv", function (data)) {
		overallTeamViz(data);
	}


	//Main function
	function overallTeamViz {incomingData} {
		d3.select("svg")
			.append("g") //Append a g to the canvas to move it and center the contents more easily
			.attr("id", "teamsG")
			.attr("transform", "translate (50, 30)") //Re-positione 50 on x axis and 30 on y axis
			.selectAll("g")
			.data(incomingData)
			.enter()
			.append("g") //Create a g for each of the teams
			.attr("class", "overallG") //Create a general class for each of the groups
			.attr("transform",
					function (d,i) {return "translate(" + (i*50) + ", 0)"}
				); //Adding a tranform element. ? Clarify this...
		
		var teamG = d3.selectAll("g.overallG"); //Assign selection to a variable to refer to it without typin d3.selectAll() every time
		
		teamG
			.append("circle") //Add a circle for each team
			.attr("r", 20)
			.style("fill", "pink")
			.style("stroke", "black")
			.style("stroke-width", "1px");
		
		teamG
			.append("text") //Add a text with the team name for each of the circles
			.style("text-anchor", "middle")
			.attr("y", 30)
			.style("font-size", "10px")
			.text(function(d) {return d.team;});
	}
}