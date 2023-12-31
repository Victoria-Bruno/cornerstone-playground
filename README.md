## Cornerstone3D Playground
Playground to learn how to use the [Cornerstone3D](https://www.cornerstonejs.org/) library:

<img alt="logo" src="https://www.cornerstonejs.org/img/cornerstone-logo-badge.png" width=10%>
<img alt="npm" src="https://img.shields.io/npm/dm/cornerstone-tools">


When building software applications for radiology certain specific functionalities can be included through this JS library, such as rendering DICOM
images, manipulation (panning, zooming, etc), annotation, and segmentation.

### Stack Used:
- **Backend**: Docker, ORTHANC Server</li>
- **Frontend**: React, Typescript</li>

### How to Deploy
- Open Docker desktop app
- Run ORTHANC server (check package.json for command) - (you can visit server port to upload DICOM data)
- Install and run app

### Features
The components folder includes an example-template file to run the examples provided in the [Cornerstone Documentation - Examples list](https://www.cornerstonejs.org/docs/examples).
Currently, the playground has only one example it can run in the components folder, which is 'stackBasic.ts'.
