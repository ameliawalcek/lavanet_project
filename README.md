# Lava Protocol Blockchain Leaderboard 🌋

Welcome to the Lava Protocol Blockchain Leaderboard! This web application showcases the top 10 chains on Lava by the number of relays passed in the Lava Blockchain over the last 20 blocks. It offers an engaging and interactive way to observe the leading chains in terms of relay activity.

## 🏆Live Leaderboard

Explore the <a href="https://lava-blockchain-leaderboard.netlify.app/" target="_blank">Lava Blockchain Leaderboard</a> live, featuring a responsive design for seamless access across devices.

## Background

Lava Protocol is a decentralized RPC access infrastructure enabling developers to seamlessly interact with RPC providers across various chains. Developers are paired with providers, and upon successful relay completion, providers report the work to the blockchain and request payment.

## How It Works

The Lava Protocol Blockchain Leaderboard fetches data from the Lava Blockchain and displays the top chains based on the number of relays passed in the last 20 blocks. It provides a real-time update of the leaderboard as new blocks are added.

## 🚀Getting Started

Follow these steps to set up and run the application locally:

1. **Clone the Repository**: Clone this repository to your local machine:

```bash
   git clone https://github.com/ameliawalcek/lavanet_project.git
```

2. **Install Dependencies**: Navigate to the project directory and install the required dependencies using npm or yarn:

```bash
cd lavanet_project
npm install
```

2. **Configuration**: Create a `.env` file in the root directory and provide the necessary configuration for the Lava Protocol API. You can see an example in the `.example.env` file:

```bash
VITE_LAVA_URI=<Lava_Protocol_API_URL>
```

3. **Run the App**: Start the development server to run the web app:

```bash
npm run dev
```

4. **Access the App**: Ctrl + click on the link displayed in the terminal to open the app in your browser.

## Usage

Upon launching the app, you'll immediately observe a list of the leading chains based on the relay count within the most recent 20 blocks. The data refreshes in real-time as new blocks are added to the Lava Blockchain.

## 🤝Contributing

I enthusiastically welcome contributions to the Lava Protocol Blockchain Leaderboard. To contribute, kindly fork this repository, implement your enhancements, and submit a pull request. Whether you're improving existing features or introducing new ones, your efforts are greatly appreciated!

Thank you for exploring the Lava Protocol Blockchain Leaderboard. Embark on an exciting journey to discover the relay activities of top chains on the Lava Blockchain. If you have any queries or require assistance, don't hesitate to reach out. Happy coding! 🎉
