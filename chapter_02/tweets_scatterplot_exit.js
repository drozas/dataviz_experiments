d3.json("tweets.json", function(error,data) {dataViz(data.tweets)});

function dataViz(incomingData) {

	
	//Create a new attribute based on the number of tweets
	incomingData.forEach(function (el) {
		el.impact = el.favorites.length + el.retweets.length;
		//Transform the ISO date into a data type
		el.tweetTime = new Date(el.timestamp);
	})
	
	//Define max function according to impact
	var maxImpact = d3.max(incomingData, function (el) {
		return el.impact;}
	);

	//Return earliest and latest tweets in an array
	var startEnd = d3.extent(incomingData, function (el) {
		return el.tweetTime;}
	);
	
	//Define time scale / x (for v4)
	var timeRamp = d3.scaleTime().domain(startEnd).range([20,480]);
	
	//Define y scale (for v4)
	var yScale = d3.scaleLinear().domain([0, maxImpact]).range([0,460]);
	
	//Define radius scale (for v4)
	var radiusScale = d3.scaleLinear().domain([0, maxImpact]).range([1,20]);
	
	//Define color scale (for v4) - from white to red
	var colorScale = d3.scaleLinear().domain([0, maxImpact]).range(["white","#990000"]);
	
	//d3.select("svg")
	//	.attr("style", "height: 480px; width: 600px;");
	
	d3.select("svg")
	.selectAll("circle")
	.data(incomingData, function(d) {return JSON.stringify(d)})
	.enter()
	.append("circle")
	.attr("r", function(d) {return radiusScale(d.impact)})
	.attr("cx", function(d,i) {return timeRamp(d.tweetTime)})
	.attr("cy", function(d) {return 480 - yScale(d.impact)})
	.style("fill", "#990000")
	.style("stroke", "black")
	.style("stroke-width", "1px");
	
	
	// Filter all those which did not have any impact
	var filteredData = incomingData.filter(
	function(el) {return el.impact > 0}
	);

	// The key requires a string or a number. This will return an unique id for the object
	d3.selectAll("circle")
	.data(filteredData, function(d) {return JSON.stringify(d)})
	.exit()
	.remove();

}