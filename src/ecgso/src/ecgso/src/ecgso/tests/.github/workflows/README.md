# ECGSO Global System

Open-source foundation of the Evolvera Core Global System Online: software, AI and sovereign AI for enterprises.



![CI](https://github.com/mascore7/ecgso-global-system/actions/workflows/ci.yml/badge.svg)



## Quick start

```bash
git clone https://github.com/mascore7/ecgso-global-system.git
cd ecgso-global-system
pip install -e ".[dev]"
ecgso health
```

## Development

```bash
ruff check .   # lint
mypy           # types
pytest         # tests
```

## Project layout

- `src/ecgso/`: package source
- `tests/`: test suite
- `.github/workflows/ci.yml`: lint, type-check and test on Python 3.10 to 3.13

## Contributing and security

See [CONTRIBUTING.md](CONTRIBUTING.md) and [SECURITY.md](SECURITY.md).

## License

See [LICENSE](LICENSE).
