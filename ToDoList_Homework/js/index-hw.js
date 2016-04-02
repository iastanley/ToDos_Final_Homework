//1. add todo list item to the list
//note that this action is called on the form NOT the input
$('#new').on('submit', addNewItem); 

//2. switch to edit form - by clicking edit link - for each list item
//you need to use event delegation to access the edit link
$('#todo-list').on('click', '.edit', editItem);

//3. save edited item
$('#todo-list').on('submit', '.editor', saveItem);

//4. remove item from to list - by clicking remove link
$('#todo-list').on('click', '.remove', removeItem);

//5. cross out clicked list item - to indicate completed item
$('#todo-list').on('click', '.item', switchStatus);

//6. clear the whole list
$('#clear').on('click', clearList);

//7. clear only completed items
$('#clear-completed').on('click', clearCompleted);

//8. update and record the number of active list items
//this function will be called within other operations
function updateCount(){
	
	//find length of array for ul li's with no done class
	var count = $('#todo-list li span').not('.done').length;

	//update span with id="count" to display count
	$('#count').text(count);

}


/****************FUNCTION DEFINITIONS*********************/

//1. ADDING NEW ITEM TO LIST WHEN INPUT SUBMITTED
function addNewItem(event){
	//prevent page reloading
	event.preventDefault();

	//store value of input
	var newItem = $('#newItem').val();

	//create and store a string of the new li to be added to todo-list
	var newHtml = 	'<li>' +
						'<span class="item">' + newItem + '</span>' +
						'<a class="edit">Edit</a>' +
						'<a class="remove">Remove</a>' +
					'</li>';

	//add li to todo-list containing newItem as part of string
	$('#todo-list').append(newHtml);

	//clear input after subitting
	$('#newItem').val(''); 

	//update count
	updateCount();
}

//2. EDIT LIST ITEM
function editItem(){

	//store the current value of the list item
	//siblings is used to access the span adjacent to the clicked edit link
	//note the use of .text instead of .html - either will work but I think .text is better???
	var currentItem = $(this).siblings('.item').text();

	//create and store new HTML for form for editing with value of current list item
	var newHtml =	'<form class="editor">' +
						'<input value="' + currentItem +'">' +
					'</form>';

	//change the html of the parent li to newHtml
	$(this).parent().html(newHtml);

	//change the focus to the input
	$('.editor').focus();

}

//3. SAVE AN EDITED LIST ITEM
function saveItem(event){
	
	event.preventDefault();

	//store value of submitted input
	//this now represents the form - submit is done on the form
	var editedItem = $(this).children('input').val();

	//create and store new html for edited list item
	var newHtml =	'<span class="item">' + editedItem + '</span>' +
					'<a class="edit">Edit</a>' +
					'<a class="remove">Remove</a>';

	//change html of list item
	$(this).parent().html(newHtml);

}

//4. REMOVE LIST ITEM
function removeItem(){
	//remove list item when remove link is clicked
	//this is the remove link
	$(this).parent().remove();

	//update count
	updateCount();
}

//5. TOGGLE STATUS OF ITEM TO AND FROM COMPLETED
function switchStatus(){
	//toggle done class on .item
	//this is the span with the class of .item 
	$(this).toggleClass('done');

	//update count
	updateCount();
}

//6. CLEAR ALL LIST ITEMS
function clearList(){
	$('#todo-list li').remove();

	//update count
	updateCount();
}

//7. REMOVE ONLY COMPLETED ITEMS FROM LIST
function clearCompleted(){
	//remove parent li if span class="done"
	$('.done').parent().remove();

	//update count
	updateCount();
}






















