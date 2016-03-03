/*
 * filter demo
 **/
console.log("filterjs running\n");

// tags dataset divided into categories
var categoriesOfTags = {
	shape: [ { name: 'square', active: true }, { name: 'triangle', active: true }, 
		{ name: 'round', active: true}, { name: 'fat', active: true} ],
	color: [ { name: 'yellow', active: true }, { name: 'blue', active: true },
		{ name: 'red', active: true }, { name: 'green', active: true }],
	type: [ { name: 'flower', active: true }, { name: 'plant', active: true },
		{ name: 'animal', active: true }, { name: 'bird', active: true }]
};

// dataset with tags
var dataset = [
	{ name: 'platypus', tags: ['animal', 'red', 'green', 'blue', 'round', 'fat'], visible: true },
	{ name: 'høne', tags: ['bird', 'animal', 'red', 'yellow', 'round', 'triangle'], visible: true },
	{ name: 'måge', tags: ['bird', 'animal', 'blue', 'round', 'triangle'], visible: true },
	{ name: 'mus', tags: ['animal', 'red', 'blue', 'round', 'fat'], visible: true },
	{ name: 'rose', tags: ['flower', 'plant', 'red', 'yellow', 'green', 'round'], visible: true },
	{ name: 'appletree', tags: ['plant', 'red', 'green', 'round'], visible: true }
];

// choosen tags
choosenTags = [];

function printVisibleData() {
	process.stdout.write("visible data: ");
	for(var i = 0; i < dataset.length; i++) {
		if(dataset[i].visible) process.stdout.write(dataset[i].name + " ");
	}
	console.log();
}

function disableAllTagsFromOtherCategoriesNotPresent(choosenTag) {
	// find tag category
	var cat;
	for (var category in categoriesOfTags) {
		for (var tag in categoriesOfTags[category]) {
			//console.log(categoriesOfTags[category][tag]);
			if (choosenTag === categoriesOfTags[category][tag].name) cat = category;
		}
	}
	console.log(cat);

	// disable all data items with no tags present
	dataset.forEach(function(data) {
		var found = false;
		data.tags.forEach(function(datatag) {
			choosenTags.forEach(function(tag) {
				if (datatag === tag) found = true;
			});
		});
		data.visible = found;
	});
	// collect pool of tags that can be active/inactive
}

function addTag(tag) {
	choosenTags.push(tag);
	disableAllTagsFromOtherCategoriesNotPresent(tag);
	process.stdout.write("choosenTags: ");
	console.log(choosenTags);
}

function mainloop() {
	printVisibleData();
	addTag("bird");
	printVisibleData();
}

mainloop();
