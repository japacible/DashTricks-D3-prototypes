var width = window.innerWidth,
height = window.innerHeight;

var projection = d3.geo.albers()
	.center([0, 30])
	.rotate([-70, 0])
	.parallels([23, 37])
	.scale(2 * width)
	.translate([width * 0.3, height * 0.5]);

var path = d3.geo.path()
	.projection(projection)
	.pointRadius(2);

var svg = d3.select("body").append("svg")
	.attr("width", width)
	.attr("height", height);

var facName = svg.append("text")
	.attr("class", "display")
	.attr("x", "800px")
	.attr("y", "200px");

var facCov = svg.append("text")
	.attr("class", "display")
	.attr("x", "800px")
	.attr("y", "250px");

d3.json("pakistan.json", function(error, pak) {
	var provinces = topojson.feature(pak, pak.objects.provinces),
	districts = topojson.feature(pak, pak.objects.districts),
	subdistricts = topojson.feature(pak, pak.objects.subdistricts);
/*
	svg.selectAll(".province")
			.data(provinces.features)
		.enter().append("path")
			.attr("class", function(d) { return "province " + d.properties.name1.replace(/[ .]/g, ""); })
			.attr("d", path);

	svg.selectAll(".district")
			.data(districts.features)
		.enter().append("path")
			.attr("class", function(d) { return "district " + d.properties.name2.replace(/[ .]/g, ""); })
			.attr("d", path);
*/
	svg.selectAll(".subdistrict")
			.data(subdistricts.features)
		.enter().append("path")
			.attr("class", function(d) { return "subdistrict " + d.properties.name3.replace(/[ .]/g, ""); })
			.attr("d", path)
			.style("fill", function(d) { return "rgb(" + Math.pow(Math.round(Math.random()*6), 3) + ",110,210)" });

	svg.append("path")
		.datum(topojson.mesh(pak, pak.objects.subdistricts, function(a, b) { return a !== b; })) // return a !== b; for tangential borders only
		.attr("d", path)
		.attr("class", "subdistrict-boundary");

	svg.append("path")
		.datum(topojson.mesh(pak, pak.objects.districts, function(a, b) { return a !== b; })) // return a !== b; for tangential borders only
		.attr("d", path)
		.attr("class", "district-boundary");

	svg.append("path")
		.datum(topojson.mesh(pak, pak.objects.provinces, function(a, b) { return a !== b; })) // return a !== b; for tangential borders only
		.attr("d", path)
		.attr("class", "province-boundary");

	svg.selectAll(".province-label")
			.data(provinces.features)
		.enter().append("text")
			.attr("class", function(d) { return "province-label " + d.properties.name1.replace(/[ .]/g, ""); })
			.attr("transform", function(d) { return "translate(" + path.centroid(d) + ")"; })
			.attr("dy", ".35em")
			.text(function(d) { return d.properties.name; });
});

d3.json("fake_data.json", function(error, fake) {
	var facilities = fake.facilities;

	svg.selectAll(".facility")
			.data(facilities)
		.enter().append("circle")
			.attr("class", function(d) { return "facility " + d.facility_name.replace(/[ .]/g, ""); })
			.attr("cx", function(d) { return projection([d.longitude, d.latitude])[0]; })
			.attr("cy", function(d) { return projection([d.longitude, d.latitude])[1]; })
			.attr("r", 20);

	svg.selectAll(".facility").on("click", function(fac) {
		svg.selectAll(".facility").transition()
			.attr("r", 20)
			.style("fill-opacity", 0);
		d3.select(this).transition()
			.attr("r", 40)
			.style("fill-opacity", .4);

		facName.text(fac.properties.name);
		facCov.text("Coverage: " + fac.properties.coverage + "%");
	});
});