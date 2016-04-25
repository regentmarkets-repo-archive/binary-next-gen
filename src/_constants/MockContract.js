import nextXDay from 'binary-utils/lib/nextXDay';

export const mockedContract = {
    asian: {
        ASIANU: {
            durations: [
                {
                    min: 5,
                    max: 10,
                    unit: 't'
                }
            ],
            spread: null
        },
        ASIAND: {
            durations: [
                {
                    min: 5,
                    max: 10,
                    unit: 't'
                }
            ],
            spread: null
        }
    },
    risefall: {
        CALL: {
            durations: [
                {
                    min: 5,
                    max: 10,
                    unit: 't'
                },
                {
                    unit: 's',
                    min: 15,
                    max: 31536000
                },
                {
                    unit: 'm',
                    min: 1,
                    max: 525600
                },
                {
                    unit: 'h',
                    min: 1,
                    max: 8760
                },
                {
                    unit: 'd',
                    min: 1,
                    max: 365
                }
            ],
            forwardStartingDuration: {
                range: [
                    {
                        date: new Date(),
                        open: [
                            new Date()
                        ],
                        close: [
                            new Date()
                        ]
                    },
                    {
                        date: nextXDay(1),
                        open: [
                            nextXDay(1)
                        ],
                        close: [
                            nextXDay(1)
                        ]
                    },
                    {
                        date: nextXDay(2),
                        open: [
                            nextXDay(2)
                        ],
                        close: [
                            nextXDay(2)
                        ]
                    }
                ],
                options: [
                    {
                        unit: 'm',
                        min: 2,
                        max: 1440
                    },
                    {
                        unit: 'h',
                        min: 1,
                        max: 24
                    }
                ]
            },
            spread: null
        },
        PUT: {
            durations: [
                {
                    min: 5,
                    max: 10,
                    unit: 't'
                },
                {
                    unit: 's',
                    min: 15,
                    max: 31536000
                },
                {
                    unit: 'm',
                    min: 1,
                    max: 525600
                },
                {
                    unit: 'h',
                    min: 1,
                    max: 8760
                },
                {
                    unit: 'd',
                    min: 1,
                    max: 365
                }
            ],
            forwardStartingDuration: {
                range: [
                    {
                        date: new Date(),
                        open: [
                            new Date()
                        ],
                        close: [
                            new Date()
                        ]
                    },
                    {
                        date: nextXDay(1),
                        open: [
                            nextXDay(1)
                        ],
                        close: [
                            nextXDay(1)
                        ]
                    },
                    {
                        date: nextXDay(2),
                        open: [
                            nextXDay(2)
                        ],
                        close: [
                            nextXDay(2)
                        ]
                    }
                ],
                options: [
                    {
                        unit: 'm',
                        min: 2,
                        max: 1440
                    },
                    {
                        unit: 'h',
                        min: 1,
                        max: 24
                    }
                ]
            },
            spread: null
        }
    },
    higherlower: {
        CALL: {
            barriers: {
                daily: [
                    {
                        name: 'Higher than',
                        defaultValue: '+12.3032'
                    }
                ],
                intraday: [
                    {
                        name: 'Higher than',
                        defaultValue: '+0.4469'
                    }
                ]
            },
            durations: [
                {
                    unit: 'm',
                    min: 2,
                    max: 525600
                },
                {
                    unit: 'h',
                    min: 1,
                    max: 8760
                },
                {
                    unit: 'd',
                    min: 1,
                    max: 365
                }
            ],
            spread: null
        },
        PUT: {
            barriers: {
                daily: [
                    {
                        name: 'Lower than',
                        defaultValue: '+12.3032'
                    }
                ],
                intraday: [
                    {
                        name: 'Lower than',
                        defaultValue: '+0.4469'
                    }
                ]
            },
            durations: [
                {
                    unit: 'm',
                    min: 2,
                    max: 525600
                },
                {
                    unit: 'h',
                    min: 1,
                    max: 8760
                },
                {
                    unit: 'd',
                    min: 1,
                    max: 365
                }
            ],
            spread: null
        }
    },
    digits: {
        DIGITMATCH: {
            barriers: {
                tick: [
                    {
                        name: 'Digit',
                        values: [
                            0,
                            1,
                            2,
                            3,
                            4,
                            5,
                            6,
                            7,
                            8,
                            9
                        ],
                        defaultValue: 0
                    }
                ]
            },
            durations: [
                {
                    min: 5,
                    max: 10,
                    unit: 't'
                }
            ],
            spread: null
        },
        DIGITDIFF: {
            barriers: {
                tick: [
                    {
                        name: 'Digit',
                        values: [
                            0,
                            1,
                            2,
                            3,
                            4,
                            5,
                            6,
                            7,
                            8,
                            9
                        ],
                        defaultValue: 0
                    }
                ]
            },
            durations: [
                {
                    min: 5,
                    max: 10,
                    unit: 't'
                }
            ],
            spread: null
        },
        DIGITODD: {
            durations: [
                {
                    min: 5,
                    max: 10,
                    unit: 't'
                }
            ],
            spread: null
        },
        DIGITEVEN: {
            durations: [
                {
                    min: 5,
                    max: 10,
                    unit: 't'
                }
            ],
            spread: null
        },
        DIGITOVER: {
            barriers: {
                tick: [
                    {
                        name: 'Digit',
                        values: [
                            0,
                            1,
                            2,
                            3,
                            4,
                            5,
                            6,
                            7,
                            8
                        ],
                        defaultValue: 0
                    }
                ]
            },
            durations: [
                {
                    min: 5,
                    max: 10,
                    unit: 't'
                }
            ],
            spread: null
        },
        DIGITUNDER: {
            barriers: {
                tick: [
                    {
                        name: 'Digit',
                        values: [
                            1,
                            2,
                            3,
                            4,
                            5,
                            6,
                            7,
                            8,
                            9
                        ],
                        defaultValue: 1
                    }
                ]
            },
            durations: [
                {
                    min: 5,
                    max: 10,
                    unit: 't'
                }
            ],
            spread: null
        }
    },
    endsinout: {
        EXPIRYMISS: {
            barriers: {
                daily: [
                    {
                        name: 'High barrier',
                        defaultValue: '+12.3032'
                    },
                    {
                        name: 'Low barrier',
                        defaultValue: -11.6666
                    }
                ],
                intraday: [
                    {
                        name: 'High barrier',
                        defaultValue: '+0.4469'
                    },
                    {
                        name: 'Low barrier',
                        defaultValue: '-0.4460'
                    }
                ]
            },
            durations: [
                {
                    unit: 'm',
                    min: 2,
                    max: 525600
                },
                {
                    unit: 'h',
                    min: 1,
                    max: 8760
                },
                {
                    unit: 'd',
                    min: 1,
                    max: 365
                }
            ],
            spread: null
        },
        EXPIRYRANGE: {
            barriers: {
                daily: [
                    {
                        name: 'High barrier',
                        defaultValue: '+12.3032'
                    },
                    {
                        name: 'Low barrier',
                        defaultValue: -11.6666
                    }
                ],
                intraday: [
                    {
                        name: 'High barrier',
                        defaultValue: '+0.4469'
                    },
                    {
                        name: 'Low barrier',
                        defaultValue: '-0.4460'
                    }
                ]
            },
            durations: [
                {
                    unit: 'm',
                    min: 2,
                    max: 525600
                },
                {
                    unit: 'h',
                    min: 1,
                    max: 8760
                },
                {
                    unit: 'd',
                    min: 1,
                    max: 365
                }
            ],
            spread: null
        }
    },
    spreads: {
        SPREADU: {
            durations: [

            ],
            spread: {
                amountPerPoint: 1,
                stopType: 'point',
                stopLoss: 10,
                stopProfit: 10
            }
        },
        SPREADD: {
            durations: [

            ],
            spread: {
                amountPerPoint: 1,
                stopType: 'point',
                stopLoss: 10,
                stopProfit: 10
            }
        }
    },
    staysinout: {
        RANGE: {
            barriers: {
                daily: [
                    {
                        name: 'High barrier',
                        defaultValue: '+12.3032'
                    },
                    {
                        name: 'Low barrier',
                        defaultValue: -11.6666
                    }
                ],
                intraday: [
                    {
                        name: 'High barrier',
                        defaultValue: '+0.4469'
                    },
                    {
                        name: 'Low barrier',
                        defaultValue: '-0.4460'
                    }
                ]
            },
            durations: [
                {
                    unit: 'm',
                    min: 2,
                    max: 525600
                },
                {
                    unit: 'h',
                    min: 1,
                    max: 8760
                },
                {
                    unit: 'd',
                    min: 1,
                    max: 365
                }
            ],
            spread: null
        },
        UPORDOWN: {
            barriers: {
                daily: [
                    {
                        name: 'High barrier',
                        defaultValue: '+12.3032'
                    },
                    {
                        name: 'Low barrier',
                        defaultValue: -11.6666
                    }
                ],
                intraday: [
                    {
                        name: 'High barrier',
                        defaultValue: '+0.4469'
                    },
                    {
                        name: 'Low barrier',
                        defaultValue: '-0.4460'
                    }
                ]
            },
            durations: [
                {
                    unit: 'm',
                    min: 2,
                    max: 525600
                },
                {
                    unit: 'h',
                    min: 1,
                    max: 8760
                },
                {
                    unit: 'd',
                    min: 1,
                    max: 365
                }
            ],
            spread: null
        }
    },
    touchnotouch: {
        ONETOUCH: {
            barriers: {
                daily: [
                    {
                        name: 'Touch spot',
                        defaultValue: '+12.3032'
                    }
                ],
                intraday: [
                    {
                        name: 'Touch spot',
                        defaultValue: '+0.4469'
                    }
                ]
            },
            durations: [
                {
                    unit: 'm',
                    min: 2,
                    max: 525600
                },
                {
                    unit: 'h',
                    min: 1,
                    max: 8760
                },
                {
                    unit: 'd',
                    min: 1,
                    max: 365
                }
            ],
            spread: null
        },
        NOTOUCH: {
            barriers: {
                daily: [
                    {
                        name: 'Touch spot',
                        defaultValue: '+12.3032'
                    }
                ],
                intraday: [
                    {
                        name: 'Touch spot',
                        defaultValue: '+0.4469'
                    }
                ]
            },
            durations: [
                {
                    unit: 'm',
                    min: 2,
                    max: 525600
                },
                {
                    unit: 'h',
                    min: 1,
                    max: 8760
                },
                {
                    unit: 'd',
                    min: 1,
                    max: 365
                }
            ],
            spread: null
        }
    }
};
