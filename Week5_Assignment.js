class Training {
    constructor(name) {
        this.name = name; 
        }
    
    describe(){
        return `${this.name}.`;
    }
}

class Employee {
    constructor(name) {
        this.name = name;
        this.trainings = [];
    }
    
    addEmployee(employee) {
        if (employee instanceof Training) {
            this.trainings.push(employee);
        } else {
            throw new Error(`You can only add an instance of Training. Argument is not a training: ${employee}`);
        }
    }
   
    describe() {
        return `${this.name} has ${this.employees.length} employees.`;
    }
}

class Menu {
    constructor() {
        this.employees = [];
        this.selectedEmployee = null;
    }
    
    start() {
        let selection = this.showMainMenuOptions();
        //
        while (selection != 0) {
            switch (selection) {
                case '1':
                    this.createEmployee();
                    break;
                case '2':
                    this.viewEmployee();
                    break;
                case '3':
                    this.deleteEmployee();
                    break;
                case '4':
                    this.displayEmployees();
                    break;   
                default:
                    selection = 0;               
            }
            selection = this.showMainMenuOptions();
        }
        
        alert('Goodbye!');
    }
    
    showMainMenuOptions() {
        return prompt(`
          0) exit
          1) create new employee
          2) view employee
          3) delete employee
          4) display all employees
        `);
    }
    
    showEmployeeMenuOptions(employeeInfo) {
        return prompt(`
        0) back
        1) select training
        2) deselect training
        -------------------
        ${employeeInfo}
        -------------------
        3) Maintenance Lead
        4) Engine Run & Taxi
        5) Designated Inspector
        6) Aircraft Fueling
        7) Aircraft Tow
        `);
    }
    
    displayEmployees() {
        let employeeString = ' ';
        for (let i = 0; i < this.employees.length; i++){
            employeeString += i + ') ' + this.employees[i].name + '\n';
        }
        alert(employeeString);
    }
    
    createEmployee(){
        let name = prompt('Enter name for new employee:');
        this.employees.push(new Employee(name));
    }
    
    viewEmployee() {
        let index = prompt('Enter the index of the employee you wish to view:');
        if (index > -1 && index < this.employees.length) {
            this.selectedEmployee = this.employees[index];
            let description = 'Employee Name: ' + this.selectedEmployee.name + '\n';
            for (let i = 0; i < this.selectedEmployee.trainings.length; i++) {
                description += i + ') ' + this.selectedEmployee.trainings[i].name + 
                ' - ' + '\n';
            }
    
            let selec = this.showEmployeeMenuOptions(description);
            switch (selec) {
                case '1':
                    this.selectTraining();
                    break;
                case '2':
                    this.deselectTraining();
                    break;   
                case '3':
                    this.createTraining("Maintenance Lead");
                    break;
                case '4':
                    this.createTraining("Engine Run & Taxi");
                    break;
                case '5':
                    this.createTraining("Designated Inspector");
                    break;
                case '6':
                    this.createTraining("Aircraft Fueling");
                    break;
                case '7':
                    this.createTraining("Aircraft Tow");
                    break;                     
            }
        }
    }
    
    deleteEmployee() {
        let index = prompt('Enter the index of the employee you wish to delete:');
        if (index > -1 && index < this.employees.length) {
            this.employees.splice(index, 1);
        }
    }
    
    createTraining(name) {
        this.selectedEmployee.trainings.push(new Training(name));
    }
    
    selectTraining() {
        let index = prompt('Enter the index of the training you wish to select:');
        if (index > -1 && index < this.selectedEmployee.trainings.length) {
            this.selectedEmployee.trainings[index].selected = true;
        }
    }
    
    deselectTraining() {
        let index = prompt('Enter the index of the training you wish to deselect:');
        if (index > -1 && index < this.selectedEmployee.trainings.length) {
            this.selectedEmployee.trainings.splice(index, 1);
        }
    }
    
}

let menu = new Menu();
menu.start();