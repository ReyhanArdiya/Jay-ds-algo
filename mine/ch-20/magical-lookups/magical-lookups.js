let authors = [
	{
		"author_id" : 1,
		"name"      : "Virginia Woolf"
	},
	{
		"author_id" : 2,
		"name"      : "Leo Tolstoy"
	},
	{
		"author_id" : 3,
		"name"      : "Dr. Seuss"
	},
	{
		"author_id" : 4,
		"name"      : "J. K. Rowling"
	},
	{
		"author_id" : 5,
		"name"      : "Mark Twain"
	}
];

const books = [
	{
		"author_id" : 3,
		"title"     : "Hop on Pop"
	},
	{
		"author_id" : 1,
		"title"     : "Mrs. Dalloway"
	},
	{
		"author_id" : 4,
		"title"     : "Harry Potter and the Sorcerer's Stone"
	},
	{
		"author_id" : 1,
		"title"     : "To the Lighthouse"
	},
	{
		"author_id" : 2,
		"title"     : "Anna Karenina"
	},
	{
		"author_id" : 5,
		"title"     : "The Adventures of Tom Sawyer"
	},
	{
		"author_id" : 3,
		"title"     : "The Cat in the Hat"
	},
	{
		"author_id" : 2,
		"title"     : "War and Peace"
	},
	{
		"author_id" : 3,
		"title"     : "Green Eggs and Ham"
	},
	{
		"author_id" : 5,
		"title"     : "The Adventures of Huckleberry Finn"
	}
];

authors = authors.reduce((hash, { author_id, name }) => {
	hash[name] = author_id;
	return hash;
}, {});

console.log(authors);