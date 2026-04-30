from setuptools import setup, find_packages

setup(
    name="sovereign-sdk",
    version="1.0.0",
    description="Official Sovereign AG Python SDK - Transparent Proxy Wrapper for AI Agents.",
    author="Sovereign AG",
    author_email="dev@sovereign-ag.in",
    url="https://github.com/sovereign-ag/sovereign-python-sdk",
    packages=find_packages(),
    install_requires=[
        "requests>=2.25.0",
        "cryptography>=41.0.0",
        "pydantic[dotenv]>=2.0.0",
    ],
    entry_points={
        "console_scripts": [
            "sovereign = sovereign_agent.cli:main",
        ],
    },
    classifiers=[
        "Programming Language :: Python :: 3.11",
        "License :: Other/Proprietary License",
        "Operating System :: OS Independent",
        "Topic :: Security :: Cryptography",
    ],
    license="Sovereign Source-Available License v1.0",
    python_requires=">=3.8",
)
