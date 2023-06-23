#!/bin/bash

echo -e "env.sh loaded"

# Config
ENVSH_ENV="${ENVSH_ENV:-"./.env"}"
ENVSH_PREFIX="${ENVSH_PREFIX:-"NEXT_PUBLIC_"}"
ENVSH_PREFIX_STRIP="${ENVSH_PREFIX_STRIP:-true}"

# Can be `window.__env = {` or `const ENV = {` or whatever you want
ENVSH_PREPEND="${ENVSH_PREPEND:-"window.__env = {"}"
ENVSH_APPEND="${ENVSH_APPEND:-"}"}"
ENVSH_OUTPUT="${ENVSH_OUTPUT:-"./public/__env.js"}"

# Utils
__green() {
  printf '\033[1;31;32m%b\033[0m' "$1"
}

__yellow() {
  printf '\033[1;31;33m%b\033[0m' "$1"
}

__red() {
  printf '\033[1;31;40m%b\033[0m' "$1"
}

__info() {
  printf "%s\n" "$1"
}

__debug() {
  ENVSH_VERBOSE="${ENVSH_VERBOSE:-"false"}"
  if [ "$ENVSH_VERBOSE" == "true" ]; then
    printf "ENVSH_VERBOSE: %s\n" "$1"
  fi
}

ENVSH_SED="sed"
if [[ "$OSTYPE" == "darwin"* ]]; then
  echo "macOS detected, switching to gsed"

  if command -v gsed >/dev/null 2>&1 ; then
    __info "$(__green "Found"): $(gsed --version | head -n 1)"
  else
    __info "gsed not found, trying to install from homebrew..."

    if command -v brew >/dev/null 2>&1 ; then
      __info "$(__green "Found"): $(brew --version | head -n 1)"
      brew install gnu-sed
    else
      __info "$(__red "Homebrew not found, install it first: https://brew.sh/")"
      exit 1;
    fi

  fi

  ENVSH_SED="gsed"
fi

# Recreate config file
rm -f "$ENVSH_OUTPUT"
touch "$ENVSH_OUTPUT"

# Create an array from inline variables
matched_envs=$(env | grep "^${ENVSH_PREFIX}")
IFS=$'\n' read -r -d '' matched_envs_arr <<< "$matched_envs"
__info "Matched inline env:"
for matched_env in "${matched_envs_arr[@]}"; do
  echo $matched_env
done

# Add assignment
echo "$ENVSH_PREPEND" >> "$ENVSH_OUTPUT"

# Check if file exists
[[ -f "$ENVSH_ENV" ]] || { echo "$ENVSH_ENV does not exist" ; exit 1 ;}

# Process .env for runtime client use
__info "$(__green "Reading ${ENVSH_ENV}...")"
while IFS= read -r line
do
  # Check if this line is a valid environment variable and matches our prefix
  if printf '%s' "$line" | grep -e "=" | grep -e "^$ENVSH_PREFIX"; then

    # Read and apply environment variable if exists
    # NOTE: <<< here operator not working with `sh`
    awk -F '=' '{print $1 ": \"" (ENVIRON[$1] ? ENVIRON[$1] : $2) "\","}' \
      <<< "$line" >> "$ENVSH_OUTPUT"
  fi
done < "$ENVSH_ENV"
echo "$ENVSH_APPEND" >> "$ENVSH_OUTPUT"

# Strip prefix if needed
$ENVSH_PREFIX_STRIP && $ENVSH_SED -i'' -e "s~$ENVSH_PREFIX~~g" "$ENVSH_OUTPUT"


# Print result
__debug "$(__green "Done! Final result in ${ENVSH_OUTPUT}:")"
__debug "`cat "$ENVSH_OUTPUT"`"

__debug "$(__green "Done! Modified ${ENVSH_ENV}:")"
__debug "`cat "$ENVSH_ENV"`"

__info "$(__green "env.sh done\n")"

# Accepting commands (for Docker)
exec "$@"