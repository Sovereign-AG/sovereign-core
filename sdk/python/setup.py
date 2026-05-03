from setuptools import setup, find_packages

setup(
    name="svtp-sdk",
    version="1.0.0",
    description="Official SVTP v1.0 Python SDK - Transparent Proxy Wrapper for AI Agents.",
    author="Sovereign AG",
    author_email="office.sovereign.ag@gmail.com",
    url="https://github.com/Sovereign-AG/sovereign-core",
    long_description=open("README.md", encoding="utf-8").read(),
    long_description_content_type="text/markdown",
    packages=find_packages(),
    install_requires=[
        "requests>=2.25.0",
        "cryptography>=41.0.0",
        "pydantic[dotenv]>=2.0.0",
    ],
    entry_points={
        "console_scripts": [
            "svtp = svtp_agent.cli:main",
        ],
    },
    classifiers=[
        "Programming Language :: Python :: 3.11",
        "License :: Other/Proprietary License",
        "Operating System :: OS Independent",
        "Topic :: Security :: Cryptography",
    ],
    license="SVTP Source-Available License v1.0",
    python_requires=">=3.8",
)





