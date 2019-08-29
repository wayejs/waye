.PHONY: dist test
default: help

# build all theme
build-theme:
	npm run build:theme

install:
	yarn install

install-cn:
	yarn install --registry=http://registry.npm.taobao.org

dev:
	npm run docs:dev

play:
	npm run dev:play

dist: install
	npm run dist

deploy:
	@npm run docs:build

pub:
	npm run pub

test:
	npm run test

help:
	@echo "   \033[35mmake\033[0m \033[1m命令使用说明\033[0m"
	@echo "   \033[35mmake install\033[0m\t\033[0m\t\033[0m\t\033[0m\t---  安装依赖"
	@echo "   \033[35mmake dev\033[0m\t\033[0m\t\033[0m\t\033[0m\t---  开发模式"
	@echo "   \033[35mmake dist\033[0m\t\033[0m\t\033[0m\t\033[0m\t---  编译项目，生成目标文件"
	@echo "   \033[35mmake deploy\033[0m\t\033[0m\t\033[0m\t\033[0m\t---  部署 docs"
	@echo "   \033[35mmake pub\033[0m\t\033[0m\t\033[0m\t\033[0m\t---  发布到 npm 上"
