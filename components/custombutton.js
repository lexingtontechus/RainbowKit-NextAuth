{/* 
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          padding: 12,
        }}
      >
        <ConnectButton.Custom>
          {({
            account,
            chain,
            openAccountModal,
            openChainModal,
            openConnectModal,
            mounted,
          }) => {
            return (
              <div
                {...(!mounted && {
                  "aria-hidden": true,
                  style: {
                    opacity: 0,
                    pointerEvents: "none",
                    userSelect: "none",
                  },
                })}
              >
                {(() => {
                  if (!mounted || !account || !chain) {
                    return (
                      <button
                        onClick={openConnectModal}
                        type="button"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          color: "#1c1917",
                          backgroundcolor: "#d97706",
                        }}
                      >
                        Connect Wallet
                      </button>
                    );
                  }

                  if (chain.unsupported) {
                    return (
                      <button onClick={openChainModal} type="button">
                        Wrong network
                      </button>
                    );
                  }

                  return (
                    <div
                      style={{
                        display: "flex",
                        gap: 12,
                        background: "#ffdd00",
                      }}
                    >
                      <button
                        onClick={openChainModal}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          background: "#ffdd00",
                        }}
                        type="button"
                      >
                        {chain.hasIcon && (
                          <div
                            style={{
                              background: chain.iconBackground,
                              width: 12,
                              height: 12,
                              borderRadius: 999,
                              overflow: "hidden",
                              marginRight: 4,
                            }}
                          >
                            {chain.iconUrl && (
                              <Image
                                alt={chain.name ?? "Chain icon"}
                                src={chain.iconUrl}
                                width={12}
                                height={12}
                              />
                            )}
                          </div>
                        )}
                        {chain.name}
                      </button>

                      <button onClick={openAccountModal} type="button">
                        {account.displayName}
                        {account.displayBalance
                          ? ` (${account.displayBalance})`
                          : ""}
                      </button>
                    </div>
                  );
                })()}
              </div>
            );
          }}
        </ConnectButton.Custom>
      </div>
      */}
    

//export default Home;
