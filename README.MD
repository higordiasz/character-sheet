# Character Sheet

It was created for educational purpose only.

This is a basic D&D character sheet.

## Quick Links

- [Discord](https://discord.gg/GsNMF5x3YV)
- [GitHub](https://github.com/higordiasz)

## Routers

| Router           | Status | Type | Description                               |
| ---------------- | ------ | ---- | ----------------------------------------- |
| /:character      | ✔      | GET  | Get character sheet                       |
| /:character/json | ✔      | GET  | Get character information as JSON         |
| /:character      | ✔      | POST | Update character information              |
| /events          | ✔      | GET  | Send event every time chracter as updated |

## Contributing

Pull requests are welcome! If you see something you'd like to add, please do. For drastic changes, please open an issue first.

## Supporting the project

You can support the maintainer of this project through the links below

- [Support via GitHub Sponsors](https://github.com/sponsors/higordiasz)

## .env

To use this API create a .env file.

```
DBCONNECTION= String connection of MongoDB
```
