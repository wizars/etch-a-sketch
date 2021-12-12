# Etch-a-sketch toy with Java Script
![preview](https://user-images.githubusercontent.com/28983684/145704788-358ae63d-ccc0-46be-8d5d-5d8487325fa4.png)

I developed this little javascript app as part of the [Odin project course](https://www.theodinproject.com/paths/foundations/courses/foundations/lessons/etch-a-sketch-project)


You can choose the size of the drawing grid at the beginning, I suggest 24. In this grid each pixel is represented by a div element generated in runtime with JS.
It's a etch-a-sketch app where you can draw with the movement of the mouse. You can choose 4 different modes of drawing: 
- **Normal**, just color each pixel in black
- **Rainbow**, each pixel is assign a random color
- **Gradual**, each pixel is colored black and assigned an increasing opacity, with 10% steps, each time the mouse passes over
- **Erase**, color the pixel back to white

Also I went a little further and I added an extra function (when the grid is 24x24) which opens a predefined bmp picture, reads it's pixel information and maps it to the corresponding div/pixel element effectively showin a cat icon
