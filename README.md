# VR Hotel Tour

A web-based VR indoor tour application for a hotel booking experience. This application allows users to explore the hotel in a 360° environment and interact with virtual elements to make booking decisions.

## Features

- Immersive 360° tours of hotel areas (lobby, rooms, restaurant, pool)
- Interactive navigation between different spaces
- Information hotspots with detailed descriptions
- Booking functionality directly from VR
- Desktop UI for non-VR users
- Mobile responsive design
- Cross-device compatibility

## Technologies Used

- A-Frame VR Framework
- JavaScript (ES6+)
- HTML5/CSS3
- Responsive Web Design

## Getting Started

### Prerequisites

- Node.js (v14+)
- npm or yarn

### Installation

1. Clone the repository:
```
git clone [repository-url]
cd vr-hotel-tour
```

2. Install dependencies:
```
npm install
```

3. Start the development server:
```
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

## Usage

- **VR Mode**: Click the VR button at the bottom right to enter immersive mode on compatible devices
- **Navigation**: Look at arrow icons and click (or gaze if in VR mode) to move between areas
- **Information**: Click on info icons to display details about rooms and amenities
- **Booking**: You can book a room directly from the room details panel
- **Desktop**: Use mouse to look around and click on hotspots

## Directory Structure

```
vr-hotel-tour/
├── index.html          # Main HTML file
├── style.css           # CSS styles
├── script.js           # Main JavaScript functionality
├── assets/             # 360° images and icons
├── package.json        # Dependencies
└── README.md           # Documentation
```

## Adding Custom 360° Images

To add your own 360° panoramic images:

1. Add your equirectangular 360° images to the `assets/` directory
2. Update the corresponding `<img>` tags in the `<a-assets>` section of the HTML
3. Update the hotspots and navigation elements as needed

## Future Enhancements

- Adding more hotel areas (gym, spa, conference rooms)
- Implementing virtual tour guide
- Adding realistic ambient audio
- Supporting multi-language options
- Implementing real payment gateway integration

## License

This project is licensed under the MIT License - see the LICENSE file for details. 