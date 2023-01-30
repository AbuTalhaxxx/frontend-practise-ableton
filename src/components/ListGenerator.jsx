


function ListGenerator(listType){
    
    const layout = (listType === "on")? "flex-row justify-around" : "lg:flex-row lg:items-center lg:justify-evenly";

	return (
        <ul className="flex flex-col flex-wrap items-center justify-evenly lg:">
        	
        </ul>
		);

}

export default ListGenerator;