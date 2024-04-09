import { QMainWindow, QWidget, QLabel, QPushButton, QIcon, QBoxLayout, Direction, QFont, QLineEdit } from '@nodegui/nodegui';
import { DESTRUCTION } from 'node:dns';
import * as path from "node:path";
import sourceMapSupport from 'source-map-support';

sourceMapSupport.install();

function main(): void {
  
  const win = new QMainWindow();
  win.setWindowTitle("GPBO");

  let equippedColor = "Unassigned";

  const centralWidget = new QWidget();
  const rootLayout = new QBoxLayout(Direction.TopToBottom);
  centralWidget.setObjectName("myroot");
  centralWidget.setLayout(rootLayout);
  rootLayout.addWidget(centralWidget);

  //const button = new QPushButton();
  //button.setIcon(new QIcon(path.join(__dirname, '../assets/logox200.png')));
  
  const saveButton = new QPushButton();
  saveButton.setText("Save!");
  saveButton.addEventListener("clicked", SaveDancefloor);
  rootLayout.addWidget(saveButton);

  let filename = "";

  const setFilenameTextbox = new QLineEdit();
  setFilenameTextbox.setPlaceholderText("Write your desired filename here...");
  setFilenameTextbox.addEventListener('textChanged', (text) => {filename = text});
  rootLayout.addWidget(setFilenameTextbox);

  function SaveDancefloor() 
  {
    const fs = require("fs");
    //const filePath = "C:/Users/eric.berntsson/Documents/Unity projects/Tools/SavedDancefloor.txt";
    const filePath = "C:/Users/eric.berntsson/Documents/Unity projects/Tools/"+ filename + ".txt";

    // Create an array to store row strings
    let rowsContent = [];

    // Process each row separately
    rowsAndColorChangingButtons.forEach(row => {
        let rowColors = row.map(button => GetColorNameFromButton(button));
        rowColors = rowColors.filter(color => color !== "Unassigned"); // Remove "Unassigned" colors
        if (rowColors.length > 0) { // Only add non-empty rows
            // Join row colors into a string
            let rowContent = rowColors.join("");
            // Add row content to rowsContent
            rowsContent.push(rowContent);
        }
    });
    

    // Join rowsContent with newline characters to form file content
    const fileContent = rowsContent.join('\n');

    // Write fileContent to the file
    fs.writeFile(filePath, fileContent, (err) => {
        if (err) {
            console.error("Error writing to file:", err);
        } else {
            console.log("File saved successfully.");
        }
    });
}

const loadButton = new QPushButton();
loadButton.setText("Load");
loadButton.addEventListener("clicked", LoadDancefloor);
rootLayout.addWidget(loadButton);

function LoadDancefloor()
{

}

function GetColorNameFromButton(button) {
    switch (button.objectName()) {
        case "green":
            return "G";
        case "pink":
            return "P";
        case "blue":
            return "B";
        case "orange":
            return "O";
        default:
            return "Unassigned";
    }
}
  
  const welcomingMessageText = new QLabel();
  welcomingMessageText.setText("Make your own dancefloor!");
  welcomingMessageText.setObjectName("mylabel");
  rootLayout.addWidget(welcomingMessageText);
  
  const equippedColorText = new QLabel();
  equippedColorText.setText("Unassigned");
  rootLayout.addWidget(equippedColorText);

  const rowWidget = new QWidget();
  const rowLayout = new QBoxLayout(Direction.LeftToRight);
  rowWidget.setLayout(rowLayout);
  rootLayout.addWidget(rowWidget);
  
  const greenButton = new QPushButton();
  greenButton.setText("Green");
  greenButton.setObjectName("green");
  greenButton.addEventListener("clicked", () => {EquipColor(greenButton)});
  rowLayout.addWidget(greenButton);

  const pinkButton = new QPushButton();
  pinkButton.setText("Pink");
  pinkButton.setObjectName("pink");
  pinkButton.addEventListener("clicked", () => {EquipColor(pinkButton)});
  rowLayout.addWidget(pinkButton);
  
  const blueButton = new QPushButton();
  blueButton.setText("Blue");
  blueButton.setObjectName("blue");
  blueButton.addEventListener("clicked", () => {EquipColor(blueButton)});
  rowLayout.addWidget(blueButton);

  const orangeButton = new QPushButton();
  orangeButton.setText("Orange");
  orangeButton.setObjectName("orange");
  orangeButton.addEventListener("clicked", () => {EquipColor(orangeButton)});
  rowLayout.addWidget(orangeButton);

  function EquipColor(button)
  {
    if (button == blueButton)
    {
      equippedColorText.setText("Blue");
      equippedColor = "Blue";
    }  
    if (button == pinkButton)
    {
      equippedColorText.setText("Pink");
      equippedColor = "Pink";
    }  
    if (button == greenButton)
    {
      equippedColorText.setText("Green");
      equippedColor = "Green";
    }
    if (button == orangeButton)
    {
      equippedColorText.setText("Orange");
      equippedColor = "Orange";
    }
  }

  const buttonThatAddsButtons = new QPushButton();
  buttonThatAddsButtons.setText("Let's get started!");
  buttonThatAddsButtons.addEventListener("clicked", StartCreating);
  buttonThatAddsButtons.addEventListener("clicked", () => {DestroyObject(buttonThatAddsButtons)});
  rootLayout.addWidget(buttonThatAddsButtons);
  
  function StartCreating()
  {
    const newRowButton = new QPushButton();
    newRowButton.setText("New row");
    newRowButton.addEventListener("clicked", CreateRow);
    rootLayout.addWidget(newRowButton);
  }
  
  let rowsAndColorChangingButtons = [];
  let rows = [];
  
  /*function CreateRow()
  { 
    const addWidget = new QWidget();
    const addLayout = new QBoxLayout(Direction.LeftToRight);
    addWidget.setLayout(addLayout);
    rootLayout.addWidget(addWidget);
    
    const newColumnButton = new QPushButton();
    newColumnButton.setText("New column");
    newColumnButton.addEventListener("clicked", () => {CreateColumn(addLayout)});
    addLayout.addWidget(newColumnButton);

    rows.push(newColumnButton);
  }

  let colorChangingButtons = [];
  
  function CreateColumn(layout)
  {
    const columnWidget = new QWidget();
    const newRowLayout = new QBoxLayout(Direction.LeftToRight);
    columnWidget.setLayout(newRowLayout);
    layout.addWidget(columnWidget);
    
    const colorChangingButton = new QPushButton();
    colorChangingButton.addEventListener("clicked", () => {AddColorToThisButton(colorChangingButton)});
    newRowLayout.addWidget(colorChangingButton);
    
    colorChangingButtons.push(colorChangingButton);

    rowsAndColorChangingButtons.push(colorChangingButtons);
    console.log("Rows and color-changing buttons:", rowsAndColorChangingButtons);
  }*/

  function CreateRow() 
  {
    const newRow = [];
    rowsAndColorChangingButtons.push(newRow);

    const addWidget = new QWidget();
    const addLayout = new QBoxLayout(Direction.LeftToRight);
    addWidget.setLayout(addLayout);
    rootLayout.addWidget(addWidget);

    const newColumnButton = new QPushButton();
    newColumnButton.setText("New column");
    newColumnButton.addEventListener("clicked", () => {CreateColumn(addLayout, newRow)});
    addLayout.addWidget(newColumnButton);

    rows.push(newColumnButton);
}

function CreateColumn(layout, row) 
{
    const columnWidget = new QWidget();
    const newRowLayout = new QBoxLayout(Direction.LeftToRight);
    columnWidget.setLayout(newRowLayout);
    layout.addWidget(columnWidget);

    const colorChangingButton = new QPushButton();
    colorChangingButton.addEventListener("clicked", () => 
    {
        AddColorToThisButton(colorChangingButton);
        console.log("Button clicked:", colorChangingButton);
    });
    newRowLayout.addWidget(colorChangingButton);

    row.push(colorChangingButton);
}

  function AddColorToThisButton(button)
  {
    if (equippedColor == "Blue")
    {
      button.setObjectName("blue");
    }
    if (equippedColor == "Pink")
    {
      button.setObjectName("pink");
    }
    if (equippedColor == "Green")
    {
      button.setObjectName("green");
    }
    if (equippedColor == "Orange")
    {
      button.setObjectName("orange");
    }
  }

  function DestroyObject(object)
  {
    object.delete();
  }
  
  win.setCentralWidget(centralWidget);
  win.setStyleSheet(
    `
      #myroot {
        background-color: #009688;
        height: '100%';
        align-items: 'center';
        justify-content: 'center';
      }
      #mylabel {
        font-size: 16px;
        font-weight: bold;
        padding: 1;
      }
      #green {
        background-color: #00FF63;
      }
      #pink {
        background-color: #FF009D;
      }
      #blue {
        background-color: #00ACFF;
      }
      #orange {
        background-color: #FFAB00;
      }
    `
    );
  win.show();

  (global as any).win = win;
}
main();
