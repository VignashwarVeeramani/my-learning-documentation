# How to Use and Update This Documentation

This repository is a Docusaurus-based site for personal learning notes. It's designed to be simple to set up and maintain.

## Prerequisites

- Node.js (version 18.0 or higher)
- Yarn or npm (npm is included with Node.js)

## Local Development

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd my-learning-documentation
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```
    or
    ```bash
    yarn install
    ```

3s. **Start the development server:**
    You can use the provided script or the standard npm/yarn command.
    ```bash
    ./run-local.sh
    ```
    or
    ```bash
    npm start
    ```
    This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server. The site will be available at `http://localhost:3000`.

## Adding New Content

Adding new documentation is as simple as creating a new Markdown file.

1.  **Navigate to the `docs` directory.**
2.  **Choose a topic folder** (e.g., `java`, `springboot`) or create a new one.
3.  **Add a new Markdown file** (e.g., `my-new-topic.md`).

The sidebar navigation is automatically generated from the folder structure within the `docs` directory.

### Adding a New Major Topic

1.  Create a new folder in the `docs` directory (e.g., `docs/kubernetes`).
2.  Add a `_category_.yml` file inside the new folder to configure its label in the sidebar.
3.  Add a new entry in `sidebars.js` and `docusaurus.config.js` (in the `navbar.items` array) to make it appear.
4.  Add your markdown files to the new folder.